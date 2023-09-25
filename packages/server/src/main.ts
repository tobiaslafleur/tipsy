import 'dotenv/config';

import app from '~/lib/app';

function main() {
  app.listen(4000, () => {
    console.log('Server is running');
  });
}

main();
