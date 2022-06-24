import Konva from "konva";
import { NodeConfig } from "konva/lib/Node";
import { ClassAttributes } from "react";
import { KonvaNodeComponent, KonvaNodeEvents } from "react-konva";

type WrappedProps<N extends Konva.Node, C extends NodeConfig> = C &
  ClassAttributes<N> &
  KonvaNodeEvents;

export type WithAddonsOptions = {
  //
};

export type ComponentWithAddons<N extends Konva.Node, C extends NodeConfig> = (
  props: WrappedProps<N, C>,
) => JSX.Element;

export function withAddons<N extends Konva.Node, C extends NodeConfig>(
  Component: KonvaNodeComponent<N, C>,
  options: WithAddonsOptions,
): ComponentWithAddons<N, C> {
  const WrappedWithAddons = (props: WrappedProps<N, C>) => {
    return <Component {...props} />;
  };

  return WrappedWithAddons;
}

/*

// probably something tonejs-oriented instead of this lol

type GainAudioModule = {
  inputBuffer: AudioBuffer,
  outputBuffer: AudioBuffer,
  process: (inputs: Float32Array[]) => Float32Array[],
};

type GainModuleProps = {
  id: number,
  location: { x: number, y: number },
};

type ModuleContainerProps = { 
  moduleGroupRef: RefObject<Konva.Group>,
  children: React.Node,
  module: string,
 }

 const ModuleContext = createContext({ module: undefined });

 const useModuleContext = () => {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error("useModuleContext must be used within a ModuleProvider");
  }
  return context;
 };

function ModuleContainer(props: ModuleContainerProps) {
  const { moduleGroupRef, children, module } = props';

  return (
    <ModuleContext.Provider value={{ module }} />
      <Group ref={moduleGroupRef}>
        {children}
      </Group>
    </ModuleContext.Provider>
  )
}

function GainModule() {
  return (
    <ModuleContainer module={"GainModule"}> 
      <ModuleTitle title="Gain" />
      <ParameterKnob text="Attenuation" parameter={0} />
    </ModuleContainer>
  );
};

*/
