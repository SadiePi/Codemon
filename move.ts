

import { Type } from './typemon.ts'

export enum DamageCategory {
    "Physical",
    "Special",
    "Status"
}

export type MoveInfo = {
    name: string;
    type: Type;
    damageCategory: DamageCategory;
    maxPP: number;
    basePower: number; // TODO: Add Battle parameter
    baseAccuracy: number;
    criticalHitProbabilityMultiplier: number;
    makesContact: boolean;
    //targetingCategory: TargetingCategory;
}