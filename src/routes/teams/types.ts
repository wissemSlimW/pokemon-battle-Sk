import type { Pokemon, Team } from '$lib/types';

export type Actions = {
	default: () => void;
	delete: (teamId: number) => Promise<void>;
	manage: (data: Team) => Promise<Team>;
};
export type Data = { teams: Team[]; pokemon: Pokemon[] };
