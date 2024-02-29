import { EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const Effects = () => {
  return (
    <EffectComposer>
      <ToneMapping whitePoint={2} blendFunction={BlendFunction.HARD_LIGHT} />
    </EffectComposer>
  );
};

export default Effects;
