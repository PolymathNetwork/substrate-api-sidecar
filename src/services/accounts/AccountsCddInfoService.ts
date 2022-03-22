import { ApiDecoration } from '@polkadot/api/types';
import { IAccountCddInfo } from 'src/types/responses';

import { AbstractService } from '../AbstractService';

export class AccountsCddInfoService extends AbstractService {
	/**
	 * Fetch balance information for an account at a given block.
	 * N.B. assumes all non native tokens are from ORML tokens pallet.
	 *
	 * @param hash `BlockHash` to make call at.
	 * @param address Address of the account to get the balance info of.
	 * @param token Token to get the balance info of.
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
