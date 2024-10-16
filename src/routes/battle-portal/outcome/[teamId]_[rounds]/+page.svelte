<script lang="ts">
	import type { Data } from './types';
	import './style.css';

	export let data: Data;
</script>

<div class="d-flex justify-content-center align-items-center">
	{#if data.team}
		<div class="card rounded-4 d-flex flex-column px-2 py-3 gap-3 report-card">
			<div class="d-flex flex-column gap-2 align-items-center">
				<span class="fs-4 text-dark">The Winner is :</span>
				<span class="text-danger fs-1 fw-bold">{data.team.name}</span>
				<span class="fs-4 text-dark">Rounds played: </span>
				<span class="fs-3 text-warning fw-bold">{data.rounds}</span>
			</div>

			<div class="d-flex flex-column gap-3 align-items-center">
				<span class="fs-4 text-dark">Players</span>
				<div class="d-flex flex-wrap gap-3 justify-content-center">
					{#each data.team.pokemon || [] as pokemon }
						<img
							class="rounded-circle overflow-hidden border border-5 border-warning player-image"
							src={pokemon.image}
							alt={pokemon.name}
						/>
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<div
			class="card rounded-4 d-flex flex-column h-100 px-2 py-3 gap-1 report-card justify-content-center align-items-center"
		>
			<span class="fs-4 text-dark">
				After <span class="fs-3 text-danger fw-bold">{data.rounds}</span> rounds
			</span>
			<span class="fs-4 text-dark">We Have a </span>
			<img
				class="overflow-hidden object-fit-contain draw-image draw-animation"
				src="/Draw.png"
				alt="Draw result"
			/>
		</div>
	{/if}
</div>
