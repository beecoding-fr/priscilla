import { Points } from "../value-objects/Points";

export interface PointsWalletProps {
  id: string;
  userId: string;
  totalPoints: Points;
  createdAt: Date;
  updatedAt: Date;
}

export class PointsWallet {
  private constructor(private readonly props: PointsWalletProps) {}

  static create(props: PointsWalletProps): PointsWallet {
    return new PointsWallet(props);
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get totalPoints(): Points {
    return this.props.totalPoints;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  addPoints(points: Points): PointsWallet {
    return new PointsWallet({
      ...this.props,
      totalPoints: this.props.totalPoints.add(points),
      updatedAt: new Date(),
    });
  }

  toJSON(): PointsWalletProps {
    return { ...this.props };
  }
}
