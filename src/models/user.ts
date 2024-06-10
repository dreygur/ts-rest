import { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../db";

class Users extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public refreshToken!: string;
  public accountVerified!: boolean;
  public designation!: string;
  public mfaDetails!: string;
  public mfaEnabled!: boolean;
  public phoneNumber!: string;
  public role!: string;
  public status!: string;
  public skillInfo!: string;
  public profilePhotoURL!: string;

  public comparePassword(passw: string, password: string, cb: (err: Error | null, isMatch?: boolean) => void) {
    bcrypt.compare(passw, password, function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };

  // Remove the password before sending to client side
  public toJSON() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }
}

Users.init(
  {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accountVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    designation: {
      type: DataTypes.STRING,
    },
    mfaDetails: {
      type: DataTypes.STRING,
    },
    mfaEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    skillInfo: {
      type: DataTypes.STRING,
    },
    profilePhotoURL: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

export default Users;