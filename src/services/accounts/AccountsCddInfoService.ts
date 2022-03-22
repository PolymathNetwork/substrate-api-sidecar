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
			//   hasCddClaim: false,
			};
		}

		// await api.rpc.identity.isIdentityHasValidCdd(did);
		console.log(api.rpc);
		console.log(JSON.stringify(api.rpc));
		// const hasCddClaim = cddResponse.isOk;
		// const status = hasCddClaim ? 'VALID' : 'INVALID';
	  
		// console.log('======================');
		// console.log(`Identity "${did}" CDD status: ${status}`);
		// console.log('======================');
	  
		return {
		  did: "",
		//   hasCddClaim,
		};
	}
}
