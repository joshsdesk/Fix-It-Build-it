import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Services | FIX IT, BUILD IT COLORADO LLC",
  description: "Sensory-informed, surface-mounted, and joist-anchored home accessibility adaptations.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
