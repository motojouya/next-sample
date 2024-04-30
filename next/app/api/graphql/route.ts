import 'reflect-metadata'; // for typeorm

import { getHandler } from '@/lib/apollo';
import { bindContext } from '@/lib/server';

export const POST = bindContext(getHandler());
