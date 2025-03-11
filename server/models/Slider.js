import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Slider = db.define("Slider", {
    gambar: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: false
});

export default Slider;
