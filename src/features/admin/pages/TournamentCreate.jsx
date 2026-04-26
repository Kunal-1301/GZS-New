import React from 'react';
import { Helmet } from 'react-helmet-async';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import TournamentEditorForm from '../components/TournamentEditorForm';

export default function TournamentCreate() {
  usePageTheme('admin');

  return (
    <>
      <Helmet>
        <title>Create Tournament | GzoneSphere Admin</title>
      </Helmet>
      <TournamentEditorForm mode="create" />
    </>
  );
}
