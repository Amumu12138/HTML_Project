import { Vector2 } from "three";
import { GPathPoint } from "./GPathPoint";
export declare class GPath {
    private _segments;
    private _points;
    private _fullLength;
    constructor();
    get length(): number;
    create2(pt1: GPathPoint, pt2: GPathPoint, pt3?: GPathPoint, pt4?: GPathPoint): void;
    create(points: Array<GPathPoint>): void;
    private createSplineSegment;
    clear(): void;
    getPointAt(t: number, result?: Vector2): Vector2;
    get segmentCount(): number;
    getAnchorsInSegment(segmentIndex: number, points?: Array<Vector2>): Array<Vector2>;
    getPointsInSegment(segmentIndex: number, t0: number, t1: number, points?: Array<Vector2>, ts?: Array<number>, pointDensity?: number): Array<Vector2>;
    getAllPoints(points?: Array<Vector2>, ts?: Array<number>, pointDensity?: number): Array<Vector2>;
    private onCRSplineCurve;
    private onBezierCurve;
}
