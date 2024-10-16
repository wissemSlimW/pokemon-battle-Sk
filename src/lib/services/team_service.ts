import { poolQuery } from '$lib/db/db';
import type { PokemonTeam, Team } from '$lib/types';
import { createInsertManyQuery, deleteManyQuery } from '$lib/utils';
import { BaseService } from './base_service';

export class TeamService extends BaseService<Team> {
	async findOne(id: number): Promise<Team> {
		const result = await poolQuery(
			`SELECT
				t.id AS id,
				t.name AS name,
				json_agg(
					json_build_object(
						'id', p.id,
						'name', p.name,
						'image', p.image,
						'type', p.type,
						'power', p.power,
						'life', p.life
					)
				) AS pokemon 
			FROM 
				teams t 
			LEFT JOIN 
				pokemon_teams pt ON t.id = pt.team 
			LEFT JOIN
				pokemon p ON pt.pokemon = p.id 
			WHERE
				t.id = $1 
			GROUP BY 
				t.id, t.name;`,
			[id]
		);

		if (result.rows.length === 0) {
			return null! as Team;
		}
		return result.rows[0];
	}
	async findAll(): Promise<Team[]> {
		const result = await poolQuery(
			`SELECT 
				t.id AS id, 
				t.name AS name, 
				json_agg(
					json_build_object( 
						'id', p.id,          
						'name', p.name,       
						'image', p.image,    
						'type', p.type,       
						'power', p.power,    
						'life', p.life        
					)
				) AS pokemon   
			FROM 
				teams t   
			LEFT JOIN 
				pokemon_teams pt ON t.id = pt.team   
			LEFT JOIN 
				pokemon p ON pt.pokemon = p.id   
			GROUP BY 
				t.id, t.name;`
		);
		return result.rows;
	}

	async create(data: Team) {
		const { pokemonIds, ..._data } = data;
		const team: Team = await super.create(_data);
		await poolQuery(
			createInsertManyQuery<PokemonTeam>(
				'pokemon_teams',
				['team', 'pokemon'],
				pokemonIds!.map((p) => ({
					team: team.id!,
					pokemon: p
				}))
			)
		);
		return { ...team, pokemonIds };
	}

	async update(id: number, data: Team) {
		const { pokemonIds, ..._data } = data;
		const newTeam = await super.update(id, _data);
		await poolQuery(deleteManyQuery<PokemonTeam>('pokemon_teams', 'team', [id]), [id]);
		await poolQuery(
			createInsertManyQuery<PokemonTeam>(
				'pokemon_teams',
				['team', 'pokemon'],
				pokemonIds!.map((p) => ({ team: id, pokemon: p }))
			)
		);
		return { ...newTeam, pokemonIds };
	}
}

export const teamsService = new TeamService('teams');
