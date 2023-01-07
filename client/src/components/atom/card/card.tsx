import './card.scss';

interface CardProps {
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
    return (
        <div className="a-card">
            {children}
        </div>
    )
 }

 export default Card;