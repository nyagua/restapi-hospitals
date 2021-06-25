import { Router } from 'express'

import * as hospitalCtrl from '../controllers/hospital.controller'

const router = Router()

router.post('/', hospitalCtrl.createHospital);

router.get('/', hospitalCtrl.findAllHospital);

router.get('/:id', hospitalCtrl.findOneHospital);

router.delete('/:id', hospitalCtrl.deleteHospital);

router.put('/:id', hospitalCtrl.updateHospital);

export default router