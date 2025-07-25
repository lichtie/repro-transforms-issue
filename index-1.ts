import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const vpc = new aws.ec2.Vpc("my-vpc", {
  cidrBlock: "10.0.0.0/16",
});

const subnet = new aws.ec2.Subnet(
  "my-subnet",
  {
    vpcId: vpc.id,
    cidrBlock: "10.0.1.0/24",
  },
  {
    parent: vpc,
  }
);

export const vpcId = vpc.id;
export const subnetId = subnet.id;
