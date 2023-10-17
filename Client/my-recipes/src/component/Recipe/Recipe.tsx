import { RecipeDto } from '../../model/RecipeDto.model';
import { Card } from 'primereact/card';

export const Recipe = (props: RecipeDto) => {
  const { title, ingredients, preparation, difficulty, picture } = props;

  const header = <img src={picture} width={100} height={100} />;

  return (
    <Card title={title} header={header}>
      <p>{ingredients}</p>
      <p>{preparation}</p>
      <p>{difficulty}</p>
    </Card>
  );
};
