import { ReactComponent as Ribbon } from '../../assets/images/ribbon.svg';

export const Modal = ({ roundStatus }) => {
  const { text, color } = roundStatus;
  return (
    <div className="ribbon">
      <Ribbon style={{ fill: color }} />
      <strong className="ribbon-content">{text}</strong>
    </div>
  );
};
