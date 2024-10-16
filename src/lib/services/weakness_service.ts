import type { Weakness } from '$lib/types/weakness';
import { BaseService } from './base_service';

export const weaknessesService = new BaseService<Weakness>('weaknesses');
