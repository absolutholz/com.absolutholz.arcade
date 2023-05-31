import { PageGridContainer } from '../PageGrid';
import { PageSection } from '../PageSection';
import { SiteTemplate } from '@arcade/library-components/src/components/PageTemplates/SiteTemplate';
import { Stack } from '../Stack';
import { Typography } from '../Typography';

export function FourOhFourPage(): JSX.Element {
	return (
		<SiteTemplate pageTitle={'Page not found'}>
			<PageSection>
				<PageGridContainer>
					<Stack spaceLevelY='m'>
						<Typography size='xl'>4oh4</Typography>
						<Typography>Well that's not right.</Typography>
					</Stack>
				</PageGridContainer>
			</PageSection>
		</SiteTemplate>
	);
}
