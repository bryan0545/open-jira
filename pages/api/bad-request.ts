import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  ok: boolean;
  message: string;
};

export default function hanfler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(400).json({ ok: false, message: 'Algo salio mal' });
}
