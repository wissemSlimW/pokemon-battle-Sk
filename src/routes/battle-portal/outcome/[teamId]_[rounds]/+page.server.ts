import { teamsService } from '$lib/services';
import type { Team } from '$lib/types';
import type { PageServerLoad } from './$types';
import type { Data } from './types';

export const prerender = false;
export const load: PageServerLoad = async ({ params }): Promise<Data> => {
	const { rounds, teamId } = params;

	try {
		if (teamId === 'Draw') return { team: null, rounds };
		const team = await teamsService.findOne(+teamId!);
		return {
			team,
			rounds
		};
	} catch (error) {
		console.error('Error loading teams:', error);
		return { team: null! as Team, rounds };
	}
};
