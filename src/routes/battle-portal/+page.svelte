<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Team } from '$lib/types';

	export let data: { teams: Team[] } = { teams: [] };

	let firstTeamId: Team['id'];
	let secondTeamId: Team['id'];

	function selectFirst(id: Team['id']) {
		firstTeamId = id;
	}

	function selectSecond(id: Team['id']) {
		secondTeamId = id;
	}

	function handleStart() {
		if (firstTeamId === null || secondTeamId === null) {
			window.alert('You need to select a team from both sides');
		} else {
			goto(`battle-portal/battle-arena/${firstTeamId}_${secondTeamId}`);
		}
	}

	function getTeamPower(team: Team) {
		return team.pokemon?.reduce((acc, cur) => acc + cur.power, 0);
	}
</script>

<div class="d-flex justify-content-center py-5">
	<h1 class="h1">Select Your Teams</h1>
</div>

<div class="d-flex gap-5 justify-content-center">
	<div class="list-group card rounded-4 d-flex flex-column gap-2 p-3">
		{#each data.teams as team}
			<button
				class="list-group-item list-group-item-action d-flex p-3 rounded-4 menu-item w-100 gap-2 {firstTeamId ===
				team.id
					? 'active'
					: ''}"
				on:click={() => selectFirst(team.id)}
			>
				<span class="badge bg-light fs-3 text-warning rounded-4">
					{getTeamPower(team)}
				</span>
				<span class="fs-4">{team.name}</span>
			</button>
		{/each}
	</div>

	<div class="list-group card rounded-4 d-flex flex-column gap-2 p-3">
		{#each data.teams as team}
			<button
				class="list-group-item list-group-item-action d-flex p-3 rounded-4 menu-item w-100 gap-2 bg-hover-primary {secondTeamId ===
				team.id
					? 'active'
					: ''}"
				on:click={() => selectSecond(team.id)}
			>
				<span class="badge bg-light fs-3 text-warning rounded-4">
					{getTeamPower(team)}
				</span>
				<span class="fs-4">{team.name}</span>
			</button>
		{/each}
	</div>
</div>

<div class="d-flex justify-content-center py-4">
	<button class="btn btn-primary fs-4 rounded-4" on:click={handleStart}> Start Battle </button>
</div>
