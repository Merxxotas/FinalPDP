/* Este es un componente de React llamado `ImagesBM` que toma un accesorio llamado `cards`. Devuelve un
elemento `div` con un estilo de visualización `flex` y mapea sobre la matriz `cards` para
representar un elemento `img` para cada tarjeta. La propiedad `key` se establece en `card.code` y
las propiedades `src` y `alt` se establecen en `card.image` y `card.code` respectivamente. La
propiedad `style` se usa para establecer el `marginRight` y el `width` de cada elemento `img`.
Finalmente, el componente se exporta como la exportación predeterminada. */
import React from "react";

const ImagesBM = ({ cards }) => {
  return (
    <div style={{ display: "flex" }}>
      {cards.map((card) => (
        <img
          key={card.code}
          src={card.image}
          alt={card.code}
          style={{ marginRight: "10px", width: "100px" }}
        />
      ))}
    </div>
  );
};

export default ImagesBM;