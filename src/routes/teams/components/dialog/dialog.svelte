<script lang="ts">
	import type { Pokemon, Team } from '$lib/types';
	import { onMount } from 'svelte';
	import './dialog.css';
	//props
	export let team: Team;
	export let pokemon: Pokemon[] = [];
	export let onConfirm: (team: Team) => void;
	export let onClose: () => void;
	//local variables
	let formDialog: HTMLDialogElement | null = null;
	let teamData: Team = { ...team };
	let formSubmitted = false;
	//actions
	const handleSubmit = () => {
		formSubmitted = true;
		if (isValid()) {
			onConfirm({ ...teamData, name: teamData.name.trim() });
			closeModal();
		}
	};
	const isValid = () => teamData.name.trim() && teamData.pokemonIds?.length === 6;
	const closeModal = () => {
		formDialog?.close();
		if (onClose) {
			onClose!();
		}
	};
	const addPokemon = (item: Pokemon) => {
		if (teamData.pokemonIds!.length < 6) {
			teamData.pokemonIds = [...(teamData.pokemonIds! || []), item.id!];
			teamData.pokemon = [...(teamData.pokemon || []), item];
		}
	};
	const removePokemon = (index: number) => {
		teamData.pokemonIds = teamData.pokemonIds!.filter((_, i) => i !== index);
		teamData.pokemon = teamData.pokemon!.filter((_, i) => i !== index);
	};
	const getImage = (index: number, team: Team, pokemon: Pokemon[]) => {
		const id = team.pokemonIds![index];
		return pokemon.find((p) => p.id === id)?.image || '';
	};
	const checkSelected = (id: number | undefined, team: Team) => {
		return team.pokemonIds!.includes(id!);
	};
	onMount(() => {
		if (formDialog) {
			formDialog.showModal();
		}
	});
</script>

<dialog bind:this={formDialog} class="rounded-4 border-light p-4">
	<div class="dialog">
		<form on:submit|preventDefault={handleSubmit}>
			<div class="mb-3">
				<label for="name" class="form-label">Name</label>
				<input
					bind:value={teamData.name}
					type="text"
					class="form-control rounded-3"
					aria-describedby="name"
					name="name"
					required
				/>
				{#if formSubmitted && !teamData.name.trim()}
					<small class="text-danger">Field required</small>
				{/if}
			</div>
			<div
				class="mb-3 w-100 overflow-auto d-flex flex-wrap iconContainer gap-3 justify-content-center"
			>
				{#each pokemon as item (item.id)}
					<button
						on:click={(e) => {
							e.preventDefault();
							e.stopPropagation();
							addPokemon(item);
						}}
						class="icon border border-light border-5 rounded-circle p-2"
						class:select={checkSelected(item.id, teamData)}
					>
						<img
							src={item.image}
							alt={item.name}
							class="rounded-circle w-100 h-100 overflow-hidden object-fit-contain"
						/>
					</button>
				{/each}
			</div>
			<span class="mt-2 fs-5 text-dark">Selected members</span>
			<div
				class="mb-3 p-1 w-100 d-flex justify-content-evenly border border-light border-4 rounded-5"
			>
				{#each Array(6) as _, index (index)}
					<button
						class="select-btn bg-light rounded-circle selectImage p-2"
						on:click={(e) => {
							e.preventDefault();
							e.stopPropagation();
							removePokemon(index);
						}}
					>
						{#if getImage(index, teamData, pokemon)}
							<img
								alt="Selected pokemon"
								class="w-100 h-100 overflow-hidden rounded-circle object-fit-contain image"
								src={getImage(index, teamData, pokemon)}
							/>
						{/if}
					</button>
				{/each}
			</div>
			<div class="d-flex gap-3 justify-content-end">
				<button type="button" class="btn btn-light" on:click={closeModal}>Close</button>
				<button
					type="submit"
					class="btn btn-primary"
					disabled={[...(teamData.pokemonIds || [])].length < 6}
				>
					Submit
				</button>
			</div>
		</form>
	</div>
</dialog>
