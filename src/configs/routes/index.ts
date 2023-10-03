import { Router } from 'express';
import AdminRouting from '@configs/routes/admin/index';

const router = Router();

router.use('/a', AdminRouting);


export default router;
