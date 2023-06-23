import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { PageWithFooterTemplate } from '@arcade/library-components/src/components/templates/PageWithFooterTemplate';
import { PageHeadBillboard } from '@arcade/library-components/src/components/PageHeadBillboard';
import { PageGridContainer } from '@arcade/library-components/src/components/PageGrid/PageGridContainer';
import { PageSection } from '@arcade/library-components/src/components/PageSection';
import { Stack } from '@arcade/library-components/src/components/Stack';
import { Typography } from '@arcade/library-components/src/components/Typography';
import { Button } from '@arcade/library-components/src/components/Button';

import { WinningCombinations } from './components/WinningCombinations';
import { FreeSpace } from './components/FreeSpace';
import { SymbolFilterGrid } from './components/SymbolFilterGrid/_SymbolFilterGrid';
import { useUnfinishedGames } from '../../hooks/useUnfinishedGames';
import {
	StickyFormFooter,
	StickyFormFooter_Form,
} from './components/StickyFormFooter';
import { Banner } from './components/Banner';
import { ConfigProvider, useGameConfig } from './contexts/ConfigContext';
import { useEffect } from 'react';

import { default as ALL_SYMBOLS } from '../../configs/germany-road-signs/symbols.json';

function _Lobby(): JSX.Element {
	const { games, createGame } = useUnfinishedGames();
	const { gameConfig, setGameConfig } = useGameConfig();
	const navigate = useNavigate();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const gameId = nanoid(5);

		createGame(gameId, {
			id: gameId,
			config: gameConfig,
		});

		navigate(`/game/${gameId}`);
	}

	useEffect(() => {
		if (gameConfig.symbolIds.length === 0) {
			setGameConfig({ symbolIds: ALL_SYMBOLS.filter((symbol) => !symbol.variant).map(({ id }) => id) });
		}
	}, []);

	return (
		<PageWithFooterTemplate pageTitle='Scavenger Bingo Lobby'>
			<PageHeadBillboard headline='Lobby' headlinePrefix='Scavenger Bingo' />
			<PageSection>
				<Stack spacingY='m'>
					<PageGridContainer>
						<p>
							Choose how you would like to play. Select the
							general game settings that determine how the game is
							played and won and the symbols that you are looking
							for.
						</p>
					</PageGridContainer>

					<PageGridContainer>
						{games.length > 0 && (
							<Banner>
								<Stack >
									<div>
										You have unfinished games. Why not keep
										playing them.
									</div>
									<div>
										<Button to='/games' text='See Games' />
									</div>
								</Stack>
							</Banner>
						)}
					</PageGridContainer>

					<StickyFormFooter_Form onSubmit={handleSubmit}>
						<PageGridContainer>
							<Typography size='xl'>
								Config
							</Typography>
							<Stack spacingY='m'>
								<WinningCombinations />

								<FreeSpace />

								<Stack
									tag='fieldset'
									direction='column'
									>
									<legend>
										<Typography as='div' size='xl'>
											Symbols
										</Typography>
									</legend>

									<SymbolFilterGrid />
								</Stack>

								<StickyFormFooter>
									<Stack spacingY='xxs' direction='row'>
										<Typography as='div' size='s'>
											{gameConfig.symbolIds.length}{' '}
											symbols selected
										</Typography>

										<Button
											disabled={
												gameConfig.symbolIds
													.length < 25 ||
												gameConfig
													.winningCombinations
													.length === 0
											}
											fullWidth
											size='l'
											type='submit'
											variant='contained'
											text='Play'
										/>
									</Stack>
								</StickyFormFooter>
							</Stack>
						</PageGridContainer>
					</StickyFormFooter_Form>
				</Stack>
			</PageSection>
		</PageWithFooterTemplate>
	);
}

function LobbyProviderWrapper (): JSX.Element {
	return (
		<ConfigProvider>
			<_Lobby />
		</ConfigProvider>
	)
}

export { LobbyProviderWrapper as Lobby };
