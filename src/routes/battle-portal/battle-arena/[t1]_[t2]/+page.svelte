<script lang="ts">
	import { goto } from '$app/navigation';
	import Avatar from './components/avatar/avatar.svelte';
	import Card from './components/card/card.svelte';
	import './style.css';

	import type { Data } from './types';

	export let data: Data;

	let firstPlayer: number = 0;
	let secondPlayer: number = 0;
	let firstPlayerHp: number = data.firstTeam?.pokemon?.[0].life || 0;
	let secondPlayerHp: number = data.secondTeam?.pokemon?.[0].life || 0;
	let round: number = 1;

	const handleRoundOutcome = () => {
		const fact1 = data.weaknesses.find(
			(w) =>
				w.type1 === data.firstTeam.pokemon?.[firstPlayer].type &&
				w.type2 === data.secondTeam.pokemon?.[secondPlayer].type
		)?.factor;
		const fact2 = data.weaknesses.find(
			(w) =>
				w.type1 === data.secondTeam.pokemon?.[secondPlayer].type &&
				w.type2 === data.firstTeam.pokemon?.[firstPlayer].type
		)?.factor;

		firstPlayerHp -= data.secondTeam.pokemon![secondPlayer].power * (fact1 || 1);
		secondPlayerHp -= data.firstTeam.pokemon![firstPlayer].power * (fact2 || 1);

		if (firstPlayerHp <= 0) {
			firstPlayer++;
			firstPlayerHp = data.firstTeam.pokemon?.[firstPlayer]?.life || 0;
		}
		if (secondPlayerHp <= 0) {
			secondPlayer++;
			secondPlayerHp = data.secondTeam.pokemon?.[secondPlayer]?.life || 0;
		}
		checkWinner();
		round++;
	};

	const checkWinner = () => {
		if (
			firstPlayer === data.firstTeam.pokemon!.length &&
			secondPlayer === data.secondTeam.pokemon!.length
		) {
			// 'Draw';
			goto(`/battle-portal/outcome/Draw_${round}`);
		} else if (firstPlayer === data.firstTeam.pokemon!.length) {
			// winner = 'Team2';
			goto(`/battle-portal/outcome/${data.secondTeam.id}_${round}`);
		} else if (secondPlayer === data.secondTeam.pokemon!.length) {
			// winner = 'Team1';
			goto(`/battle-portal/outcome/${data.firstTeam.id}_${round}`);
		}
	};
</script>

<h1 class="h1 text-primary my-4 text-center">Battle Arena</h1>
<span class="d-flex justify-content-center mt-1">
	<h3 class="h3 text-light bg-dark d-flex rounded-5 px-3 py-1 text-center">
		Round {round}
	</h3>
</span>
<div class="flex-1 d-flex align-items-center max-w-100 overflow-hidden px-5 py-2">
	<span class="d-flex flex-column align-items-center gap-3 ">
		<span class="fs-3 rounded-5 badge bg-light text-dark">{data.firstTeam.name}</span>
		{#each data.firstTeam.pokemon || [] as item, index}
			<Avatar
				imgUrl={item.image}
				isActive={index >= firstPlayer}
				isInCombat={index === firstPlayer}
			/>
		{/each}
	</span>
	<div
		class="d-flex flex-column flex-lg-row justify-content-center align-items-center flex-wrap flex-grow-1 overflow-hidden px-4"
	>
		<div class="overflow-hidden ratio-1 pokemon-card-container">
			<Card
				pokemon={[...(data.firstTeam.pokemon || [])][firstPlayer]}
				playerHealth={firstPlayerHp}
			/>
		</div>
		<div class="vs-img overflow-hidden">
			<img class="w-100 overflow-hidden" src="/vs.png" alt="vs" />
		</div>
		<div class="overflow-hidden ratio-1 pokemon-card-container">
			<Card
				pokemon={[...(data.secondTeam.pokemon || [])][secondPlayer]}
				playerHealth={secondPlayerHp}
			/>
		</div>
	</div>
	<span class="d-flex flex-column align-items-center gap-3">
		<span class="fs-3 rounded-5 badge bg-light text-dark">{data.secondTeam.name}</span>
		{#each data.secondTeam.pokemon || [] as item, index}
			<Avatar
				imgUrl={item.image}
				isActive={index >= secondPlayer}
				isInCombat={index === secondPlayer}
			/>
		{/each}
	</span>
</div>
<div class="d-flex justify-content-center p-5">
	<button class="btn btn-primary fs-3 px-4 rounded-4" on:click={handleRoundOutcome}> Fight </button>
</div>
