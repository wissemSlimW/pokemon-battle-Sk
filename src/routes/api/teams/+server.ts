import { teamsService } from '$lib/services';
import type { Team } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';
export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const team: Team = body as Team;
		const result = await teamsService.create(team);
		return new Response(JSON.stringify(result), { status: 200 });
	} catch {
		throw new Response('Failed to add item', { status: 500 });
	}
};
