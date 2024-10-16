import { teamsService, weaknessesService } from '$lib/services';
import type { Team } from '$lib/types';
import type { PageServerLoad } from './$types';
import type { Data } from './types';

export const prerender = false;
export const load: PageServerLoad = async ({ params }): Promise<Data> => {
	const { t1, t2 } = params;

	try {
		const weaknesses = await weaknessesService.findAll();
		const firstTeam = await teamsService.findOne(+t1!);
		const secondTeam = await teamsService.findOne(+t2!);
		return {
			firstTeam,
			secondTeam,
			weaknesses
		};
	} catch (error) {
		console.error('Error loading teams:', error);
		return { firstTeam: null! as Team, secondTeam: null! as Team, weaknesses: [] };
	}
};
