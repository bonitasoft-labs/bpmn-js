/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
module.exports = {
  server: {
    command: `cross-env SERVER_PORT=10002 npm run start`,
    port: 10002,
    launchTimeout: 30000, // high value mainly for GitHub Workflows running on macOS (slow machines)
    debug: true,
  },
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false',
    slowMo: process.env.SLOWMO ? process.env.SLOWMO : 0,
    args: ['--disable-infobars'],
    timeout: 120000,
  },
};
