import { getPagination } from '../libs/getPagination'
import Hospital from '../models/Hospitals'

export const findAllHospital = async(req, res) => {
    try {
        const { size, page, name } = req.query;

        const condition = name ? {
            name: { $regex: new RegExp(name), $options: "i" },
        } : {};

        const { limit, offset } = getPagination(page, size)
        const data = await Hospital.paginate(condition, { offset, limit });

        res.json({
            totalItems: data.totalDocs,
            hospitals: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong retrieving the hospital',
        });
    }
};

export const createHospital = async(req, res) => {
    try {
        const newHospital = new Hospital({
            name: req.body.name,
            location: req.body.location,
            telephone: req.body.telephone,
            medical_director: req.body.medical_director,
            opening_date: req.body.opening_date
        });
        const hospitalSaved = await newHospital.save();
        res.json(hospitalSaved)
    } catch (error) {

        res.status(500).json({
            message: error.message || 'Something goes wrong creating a hospital',
        });
    }

};

export const findOneHospital = async(req, res) => {
    const { id } = req.params;
    try {
        const hospital = await Hospital.findById(id)

        if (!hospital)
            return res
                .status(404)
                .json({ message: `Hospital with id ${id} does not exist` });

        res.json(hospital);
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error Retrieving Hospital with id: ${id}`,
        });
    };
};

export const deleteHospital = async(req, res) => {
    const { id } = req.params;
    try {
        await Hospital.findByIdAndDelete(id)
        res.json({
            message: 'Hospital were deleted succesfully'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || `Cannot delete Hospital with id: ${id}`,
        });
    }
};

export const updateHospital = async(req, res) => {
    const updateHospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
        usedFindAndModify: false
    });
    res.json({ message: "Task was updated succesfully" });
};