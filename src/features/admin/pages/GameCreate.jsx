import { Helmet } from 'react-helmet-async';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import GamePostWizard from '../components/GamePostWizard';

export default function GameCreate() {
  usePageTheme('admin');

  return (
    <>
      <Helmet>
        <title>Create Game | GzoneSphere Admin</title>
      </Helmet>
      <GamePostWizard mode="create" />
    </>
  );
}
