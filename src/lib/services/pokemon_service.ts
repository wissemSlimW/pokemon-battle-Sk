import type { Pokemon } from '$lib/types';
import { BaseService } from './base_service';

export const pokemonService = new BaseService<Pokemon>('pokemon');
