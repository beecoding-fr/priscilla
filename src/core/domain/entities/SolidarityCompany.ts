export interface SolidarityCompanyProps {
  id: string;
  userId: string;
  companyName: string;
  description: string | null;
  sector: string | null;
  address: string | null;
  phone: string | null;
  website: string | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class SolidarityCompany {
  private constructor(private readonly props: SolidarityCompanyProps) {}

  static create(props: SolidarityCompanyProps): SolidarityCompany {
    return new SolidarityCompany(props);
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get companyName(): string {
    return this.props.companyName;
  }

  get description(): string | null {
    return this.props.description;
  }

  get sector(): string | null {
    return this.props.sector;
  }

  get address(): string | null {
    return this.props.address;
  }

  get phone(): string | null {
    return this.props.phone;
  }

  get website(): string | null {
    return this.props.website;
  }

  get isVerified(): boolean {
    return this.props.isVerified;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  toJSON(): SolidarityCompanyProps {
    return { ...this.props };
  }
}
