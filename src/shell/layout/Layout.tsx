import React from 'react';
import Lantern from '../../components/decorations/Lantern';
import CloudMotif from '../../components/decorations/CloudMotif';
import Firework from '../../components/decorations/Firework';
import FanWave from '../../components/decorations/FanWave';
import BrocadeTexture from '../../components/decorations/BrocadeTexture';
import './newYearTheme.css';

interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

export default function Layout({ children, showNavigation = false }: LayoutProps) {
  return (
    <div className="new-year-bg decoration">
      <div className="lantern-container">
        <div className="lantern-wrapper lantern-left-main">
          <Lantern size={100} opacity={1} />
        </div>
        <div className="lantern-wrapper lantern-left-secondary">
          <Lantern size={70} opacity={0.8} />
        </div>
        
        <div className="lantern-wrapper lantern-right-main">
          <Lantern size={100} opacity={1} />
        </div>
        <div className="lantern-wrapper lantern-right-secondary">
          <Lantern size={70} opacity={0.8} />
        </div>
      </div>
      
      <div className="brocade-texture-wrapper">
        <BrocadeTexture />
      </div>
      
      <div className="cloud-motif cloud-left">
        <CloudMotif size={60} />
      </div>
      <div className="cloud-motif cloud-right">
        <CloudMotif size={60} />
      </div>
      
      <div className="firework firework-left">
        <Firework size={80} rays={8} rayLength={30} />
      </div>
      <div className="firework firework-right">
        <Firework size={120} rays={12} rayLength={50} />
      </div>
      
      <div className="fan-wave-container">
        <FanWave />
      </div>
      
      <main className="main-content">
        <div className="content-container">
          {children}
        </div>
      </main>
    </div>
  );
}
