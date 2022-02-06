import { useContext, useState } from 'react';

import { UserContext } from '../context/User';
import { PlayerForm } from '../components/PlayerForm';
import { PageLayoutContainer } from '../components/PageLayoutContainer';
import { Button } from '../components/Button';
import { CardBillboard, CardBillboardCoverLink, CardBillboardHeadline } from '../components/CardBillboard';
import { Dialog } from '../components/Dialog';
import { IconText } from '../components/IconText';
import { ColorSchemeToggler } from '../components/ColorSchemeToggler';
import { VisuallyHidden } from '../components/VisuallyHidden';

import { ReactComponent as SvgJoystick } from '../assets/joystick.svg';
import { Icon } from '../components/Icon';

import * as S from './Home.styled';

export function Home (): JSX.Element {
    const [ isPlayerDialogOpen, setIsPlayerDialogOpen ] = useState(false);

    const { user, saveUser, clearUser } = useContext(UserContext);

    const closePlayerDialog = () => {
        setIsPlayerDialogOpen(false);
    }

    const openPlayerDialog = () => {
        setIsPlayerDialogOpen(true);
    }

    const handlePlayerFormSubmit = (name: string) => {
        console.log({name});
        closePlayerDialog();
        saveUser({
            displayName: name
        });
    };

    return (
        <PageLayoutContainer>
            <main>
                <IconText tag='h1' slotIconPrefix={ <Icon>{ SvgJoystick }</Icon> }>
                    <div>absolutholz</div>
                    Arcade
                </IconText>

                <nav>
                    <VisuallyHidden as='h2'>Games</VisuallyHidden>

                    <S.Section>
                        <S.SectionHeadline as='h3'>Single Player</S.SectionHeadline>

                        <S.CardGrid>

                            <CardBillboard 
                                imgUri='/img/bg/original/purple-mountain-lake.jpg'
                            >
                                <CardBillboardHeadline tag='h4'>
                                    <CardBillboardCoverLink to='/sudoku'>Sudoku</CardBillboardCoverLink>
                                </CardBillboardHeadline>
                            </CardBillboard>

                            <CardBillboard 
                                imgUri='/img/bg/original/purple-flowers-sunset.jpg'
                            >
                                <CardBillboardHeadline tag='h4'>
                                    <CardBillboardCoverLink to='/minesweeper'>Minesweeper</CardBillboardCoverLink>
                                </CardBillboardHeadline>
                            </CardBillboard>

                        </S.CardGrid>

                    </S.Section>

                    <S.Section>
                        <S.SectionHeadline as='h3'>Two Players</S.SectionHeadline>

                        <S.CardGrid>

                            <CardBillboard 
                                imgUri='/img/bg/original/green-hills.jpg'
                                >
                                <CardBillboardHeadline tag='h4'>
                                    <CardBillboardCoverLink to='/tictactoe'>Tic Tac Toe</CardBillboardCoverLink>
                                </CardBillboardHeadline>
                            </CardBillboard>

                            <CardBillboard 
                                imgUri='/img/bg/original/desert-river.jpg'
                                >
                                <CardBillboardHeadline tag='h4'>
                                    <CardBillboardCoverLink to='/connect4'>Connect 4</CardBillboardCoverLink>
                                </CardBillboardHeadline>
                            </CardBillboard>

                            <CardBillboard 
                                imgUri='/img/bg/original/dead-tree-prairie.jpg'
                            >
                                <CardBillboardHeadline tag='h4'>
                                    <CardBillboardCoverLink to='/checkers'>Checkers</CardBillboardCoverLink>
                                </CardBillboardHeadline>
                            </CardBillboard>

                        </S.CardGrid>

                    </S.Section>

                    <S.Section>
                        <S.SectionHeadline as='h3'>Multiple Players</S.SectionHeadline>

                        <S.CardGrid>

                            <CardBillboard 
                                imgUri='/img/bg/original/bright-forest-stump.jpg'
                            >
                                <CardBillboardHeadline tag='h4'>
                                    <CardBillboardCoverLink to='/memory'>Memory</CardBillboardCoverLink>
                                </CardBillboardHeadline>
                            </CardBillboard>

                            <CardBillboard 
                                imgUri='/img/bg/original/autumn-trees.jpg'
                            >
                                <CardBillboardHeadline tag='h4'>
                                    <CardBillboardCoverLink to='/dotsandboxes'>Dots & Boxes</CardBillboardCoverLink>
                                </CardBillboardHeadline>
                            </CardBillboard>

                        </S.CardGrid>

                    </S.Section>
                </nav>
            </main>

            <footer>
                <div>
                    <ColorSchemeToggler />
                </div>

                { user?.displayName &&
                    <div>
                        <div>Hello <strong>{ user.displayName }</strong></div>
                        <button onClick={ clearUser }>log out</button>
                    </div>
                }

                { !user &&
                    <button onClick={ openPlayerDialog }>Log in</button>
                }
            </footer>

            <Dialog 
                isOpen={ isPlayerDialogOpen }
                slotFooter={
                    <Button form='homePlayer' type='submit'>Save</Button>
                }
            >
                <PlayerForm 
                    formID='homePlayer' 
                    onSubmit={ handlePlayerFormSubmit } 
                />
            </Dialog>
        </PageLayoutContainer>
    );
}
