import React from 'react';
import { Helmet } from 'react-helmet-async';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import BlogEditorForm from '../components/BlogEditorForm';

export default function BlogCreate() {
  usePageTheme('admin');

  return (
    <>
      <Helmet>
        <title>Create Blog | GzoneSphere Admin</title>
      </Helmet>
      <BlogEditorForm mode="create" />
    </>
  );
}
