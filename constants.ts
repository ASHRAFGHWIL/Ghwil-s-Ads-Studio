
import { LightingType, CameraAngle } from './types';

export const LIGHTING_OPTIONS: LightingType[] = [
  LightingType.NATURAL_LIGHT,
  LightingType.STUDIO_LIGHT,
  LightingType.GOLDEN_HOUR,
  LightingType.BLUE_HOUR,
  LightingType.CINEMATIC,
  LightingType.DRAMATIC,
];

export const CAMERA_ANGLE_OPTIONS: CameraAngle[] = [
  CameraAngle.FRONT_VIEW,
  CameraAngle.SIDE_VIEW,
  CameraAngle.TOP_VIEW,
  CameraAngle.FORTY_FIVE_DEGREE,
  CameraAngle.CLOSE_UP,
  CameraAngle.MACRO_SHOT,
];
