interface ServiceCardProps {
  title: string;
  image: string;
}

const ServiceCard = ({ title, image }: ServiceCardProps) => (
  <div className='service-card'>
    <div className='service-image'>
      <img src={image} alt={title} />
    </div>
    <h3>{title}</h3>
  </div>
);

export default ServiceCard;
