// Variantes compartidas para la entrada escalonada (stagger) de las tarjetas.
// Si el usuario prefiere menos movimiento, se desactiva el desplazamiento.

const EASE = [0.22, 1, 0.36, 1];

export function getVariants(reduced) {
  return {
    container: {
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduced ? 0 : 0.075,
          delayChildren: reduced ? 0 : 0.04,
        },
      },
    },
    item: reduced
      ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
      : {
          hidden: { opacity: 0, y: 16 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: EASE },
          },
        },
  };
}
