import { ApiDecoration } from '@polkadot/api/types';
import { IAccountCddInfo } from 'src/types/responses';

import { AbstractService } from '../AbstractService';

export class AccountsCddInfoService extends AbstractService {
	/**
	 * Fetch CDD status for an account at a given block.
	 *
	 * @param historicApi API linked to queried block.
	 * @param address Address to check for CDD status.
	 */
	async fetchAccountCddInfo(
		historicApi: ApiDecoration<'promise'>,
		address: string
	): Promise<IAccountCddInfo> {
		const { api } = this;

		const did = await historicApi.query.identity.keyToIdentityIds(address);

		if (did.isEmpty) {
			return {
			  did: "",
			  hasCddClaim: false,
			};
		}
		const cddResponse = await api.rpc['identity'].isIdentityHasValidCdd(did);

		const hasCddClaim = cddResponse.isOk;
	  
		return {
		  did: did.toString(),
		  hasCddClaim,
		};
	}
}
