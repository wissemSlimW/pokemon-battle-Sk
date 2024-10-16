import { teamsService } from '$lib/services';
import type { Team } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ params }) => {
	const { id } = params;
	try {
		await teamsService.delete(+id!);
		return new Response(null, { status: 200 });
	} catch {
		throw new Response('Failed to delete item', { status: 500 });
	}
};
export const PUT: RequestHandler = async ({ params, request }) => {
	const { id } = params;
	try {
		const body = await request.json();
		const team: Team = body as Team;
		const result = await teamsService.update(+id!, team);
		return new Response(JSON.stringify(result), { status: 200 });
	} catch {
		throw new Response('Failed to update item', { status: 500 });
	}
};
