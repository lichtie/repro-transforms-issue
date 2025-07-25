import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export interface VpcArgs {
  cidrBlock?: string;
}

export class Vpc extends pulumi.ComponentResource {
  public readonly vpc: aws.ec2.Vpc;
  public readonly subnet: aws.ec2.Subnet;

  constructor(
    name: string,
    args: VpcArgs = {},
    opts?: pulumi.ComponentResourceOptions
  ) {
    super("custom:network:Vpc", name, {}, opts);

    const cidrBlock = args.cidrBlock || "10.0.0.0/16";

    this.vpc = new aws.ec2.Vpc(
      `${name}VPC`,
      {
        cidrBlock,
      },
      {
        parent: this,
      }
    );

    this.subnet = new aws.ec2.Subnet(
      `${name}-subnet`,
      {
        vpcId: this.vpc.id,
        cidrBlock: "10.0.1.0/24",
      },
      {
        parent: this.vpc,
      }
    );

    this.registerOutputs({
      vpcId: this.vpc.id,
      subnetId: this.subnet.id,
    });
  }
}
