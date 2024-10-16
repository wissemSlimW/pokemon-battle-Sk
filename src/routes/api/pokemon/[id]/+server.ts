import { pokemonService } from '$lib/services';
import type { Pokemon } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ params }) => {
	const { id } = params;
	try {
		await pokemonService.delete(+id!);
		return new Response(null, { status: 200 });
	} catch {
		throw new Response('Failed to delete item', { status: 500 });
	}
};
export const PUT: RequestHandler = async ({ params, request }) => {
	const { id } = params;
	try {
		const body = await request.json();
		const team: Pokemon = body as Pokemon;
		const result = await pokemonService.update(+id!, team);
		return new Response(JSON.stringify(result), { status: 200 });
	} catch {
		throw new Response('Failed to update item', { status: 500 });
	}
};
