import { teamsService } from '$lib/services';
import type { Team } from '$lib/types';
import type { PageServerLoad } from './$types';

export const prerender = false;
export const load: PageServerLoad = async ({ params }): Promise<{ teams: Team[] }> => {
	try {
		const teams = await teamsService.findAll();
		return {
			teams
		};
	} catch (error) {
		console.error('Error loading teams:', error);
		return { teams: [] };
	}
};
