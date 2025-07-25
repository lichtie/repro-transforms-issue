import * as pulumi from "@pulumi/pulumi";
import { Vpc } from "./vpc";

const typeToStandardNameMapping: Record<string, string> = {
  "aws:ec2/vpc:Vpc": "my-vpc",
  "aws:ec2/subnet:Subnet": "my-subnet",
};
const stackName = pulumi.getStack();
const projectName = pulumi.getProject();

const vpc = new Vpc(
  "my",
  {
    cidrBlock: "10.0.0.0/16",
  },
  {
    transforms: [
      (args) => {
        return {
          props: args.props,
          opts: pulumi.mergeOptions(args.opts, {
            aliases: [
              `urn:pulumi:${stackName}::${projectName}::${args.type}::${
                typeToStandardNameMapping[args.type]
              }`,
            ],
          }),
        };
      },
    ],
  }
);

export const vpcId = vpc.vpc.id;
export const subnetId = vpc.subnet.id;
