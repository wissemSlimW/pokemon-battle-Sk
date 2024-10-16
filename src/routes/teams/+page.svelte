<script lang="ts">
	import AddCard from '$lib/components/AddCard/AddCard.svelte';
	import DeleteDialog from '$lib/components/DeleteDialog/DeleteDialog.svelte';
	import type { Pokemon, Team } from '$lib/types';
	import Card from './components/Card/Card.svelte';
	import Dialog from './components/dialog/dialog.svelte';
	import type { Data } from './types';

	export let data: Data = { teams: [], pokemon: [] };
	// loacal variable
	let isDeleteDialogOpen = false;
	let isFormDialogOpen = false;
	let deleteItem: Team = null! as Team;
	const defaultData = { name: '', pokemonIds: [], pokemon: [] };
	let formData: Team = defaultData;
	// actions
	const closeDeleteDialog = () => {
		isDeleteDialogOpen = false;
	};
	const closeFormDialog = () => {
		formData = defaultData;
		isFormDialogOpen = false;
	};
	const handleUpdate = (team: Team) => {
		formData = team;
		isFormDialogOpen = true;
	};
	const handleDelete = (team: Team) => {
		isDeleteDialogOpen = true;
		deleteItem = team;
	};
	const handleClick = () => {
		isFormDialogOpen = true;
	};
	// api request actions
	const confirmDelete = async () => {
		try {
			await fetch(`/api/teams/${deleteItem!.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			data.teams = data.teams.filter((team) => team.id !== deleteItem!.id);
			closeDeleteDialog();
		} catch (error) {
			console.error(error);
		}
	};
	const manageItem = async (requestData: Team) => {
		const { pokemon, ..._requestData } = requestData;
		let updatedTeam: Team;
		try {
			if (_requestData.id) {
				const response = await fetch(`/api/teams/${_requestData!.id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(_requestData)
				});
				updatedTeam = (await response.json()) as Team;
				const _updatedTeam = {
					...updatedTeam,
					pokemon: updatedTeam.pokemonIds?.map((id) => data.pokemon.find((p) => p.id === id)!)
				};
				const teamIndex = data.teams.findIndex((team) => team.id === _updatedTeam.id);
				const _teams = [...data.teams];
				_teams[teamIndex] = _updatedTeam;
				data.teams = _teams;
			} else {
				const response = await fetch(`/api/teams/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(_requestData)
				});
				updatedTeam = (await response.json()) as Team;
				const _updatedTeam = {
					...updatedTeam,
					pokemon: updatedTeam.pokemonIds?.map((id) => data.pokemon.find((p) => p.id === id)!)
				};
				data.teams = [...data.teams, _updatedTeam];
			}
		} catch (error) {
			console.log(error);
		}
	};
</script>

<div class="d-flex gap-3 p-3 justify-content-center flex-wrap">
	<AddCard {handleClick} />
	{#each data.teams as team (team.id)}
		<Card
			pokemon={team.pokemon || []}
			{team}
			handleDelete={() => handleDelete(team)}
			handleUpdate={() => handleUpdate(team)}
		/>
	{/each}
</div>

{#if isDeleteDialogOpen}
	<DeleteDialog text={deleteItem.name} {closeDeleteDialog} {confirmDelete} />
{/if}
{#if isFormDialogOpen}
	<Dialog team={formData} onConfirm={manageItem} onClose={closeFormDialog} pokemon={data.pokemon} />
{/if}
