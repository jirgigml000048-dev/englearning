import { useParams } from 'react-router-dom';
import { CapturePhase } from '../components/CapturePhase';
import { RoundPlaceholder } from './RoundPlaceholder';

export function Round() {
  const { id } = useParams();
  if (id === '1') return <CapturePhase />;
  return <RoundPlaceholder />;
}
