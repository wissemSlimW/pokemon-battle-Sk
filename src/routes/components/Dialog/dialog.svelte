<script lang="ts">
	import type { Pokemon, PokemonType } from '$lib/types';
	import './dialog.css';
	import { onMount } from 'svelte';
	//props
	export let onConfirm: (pokemon: Pokemon) => void;
	export let onClose: () => void;
	export let pokemon: Pokemon;
	export let pokemonTypes: PokemonType[];
	//local variables
	let formDialog: HTMLDialogElement | null = null;
	let pokemonData: Pokemon = { ...pokemon };
	let formSubmitted = false;
	//actions
	const handleSubmit = () => {
		formSubmitted = true;
		if (isValid()) {
			onConfirm({ ...pokemonData, name: pokemonData.name.trim() });
			closeModal();
		}
	};
	const isValid = () =>
		pokemonData.name.trim() &&
		pokemonData.image.trim() &&
		!!pokemonData.type &&
		pokemonData.life >= 50 &&
		pokemonData.life <= 100 &&
		pokemonData.power >= 10 &&
		pokemonData.power <= 100;

	const closeModal = () => {
		formDialog?.close();
		if (onClose) {
			onClose!();
		}
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
					bind:value={pokemonData.name}
					required
					type="text"
					name="name"
					class="form-control rounded-3"
					aria-describedby="name"
				/>
				{#if formSubmitted && !pokemonData.name.trim()}
					<small class="text-danger">Field required</small>
				{/if}
			</div>

			<div class="mb-3">
				<label for="image" class="form-label">Image Url</label>
				<input
					bind:value={pokemonData.image}
					required
					type="text"
					name="image"
					class="form-control rounded-3"
					aria-describedby="imageUrl"
				/>
				{#if formSubmitted && !pokemonData.image.trim()}
					<small class="text-danger">Field required</small>
				{/if}
			</div>

			<div class="mb-3">
				<label for="power" class="form-label">Power</label>
				<input
					bind:value={pokemonData.power}
					type="number"
					min="10"
					max="100"
					name="power"
					class="form-control rounded-3"
					aria-describedby="power"
				/>
				{#if formSubmitted && pokemonData.power < 10}
					<small class="text-danger">value out of range min 10</small>
				{/if}
				{#if formSubmitted && pokemonData.power > 100}
					<small class="text-danger">value out of range max 100</small>
				{/if}
				<div id="emailHelp" class="form-text">Provide a value between 10 and 100.</div>
			</div>

			<div class="mb-3">
				<label for="life" class="form-label">Health points</label>
				<input
					bind:value={pokemonData.life}
					type="number"
					min="50"
					max="100"
					name="life"
					class="form-control rounded-3"
					aria-describedby="life"
				/>
				{#if formSubmitted && pokemonData.life < 50}
					<small class="text-danger">value out of range min 50</small>
				{/if}
				{#if formSubmitted && pokemonData.life > 100}
					<small class="text-danger">value out of range max 100</small>
				{/if}
				<div id="emailHelp" class="form-text">Provide a value between 50 and 100.</div>
			</div>

			<div class="mb-3">
				<label for="type" class="form-label">Type</label>
				<select
					name="type"
					bind:value={pokemonData.type}
					required
					class="form-select"
					aria-label="Default select example"
				>
					<option value="">Select a type</option>
					{#each pokemonTypes as type (type.id)}
						<option value={type.id}>{type.name}</option>
					{/each}
				</select>
				{#if formSubmitted && !pokemonData.type}
					<small class="text-danger">Field required</small>
				{/if}
			</div>

			<div class="d-flex gap-3 justify-content-end">
				<button type="button" class="btn btn-light" on:click={closeModal}> Close </button>
				<button type="submit" class="btn btn-primary">Submit</button>
			</div>
		</form>
	</div>
</dialog>
