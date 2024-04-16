import { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "@app/db";

class Users extends Model {
  public email!: string;
  public password!: string;

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
      type: DataTypes.STRING,
    },
    designation: {
      type: DataTypes.STRING,
    },
    mfaDetails: {
      type: DataTypes.STRING,
    },
    mfaEnabled: {
      type: DataTypes.STRING,
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
    modelName: "Users",
  }
);

export default Users;